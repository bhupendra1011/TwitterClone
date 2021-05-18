import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import config from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import { CreateUserInput } from "./API"


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';


Amplify.configure(config)

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const saveUserToDB = async (user: CreateUserInput) => {
    // graphQL mutation
    await API.graphql(graphqlOperation(createUser, { input: user }))

  }
  const getRandomImage = () => {
    return "https://pbs.twimg.com/profile_images/1383042648550739968/fS6W0TvY_200x200.jpg";
  }


  React.useEffect(() => {
    const updateUser = async () => {
      // get authenicated user
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

      if (userInfo) {
        // check if user exists in db
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }));
        // console.log(userData)
        if (!userData.data.getUser) {
          // if not create user in db for user present in cognito aws
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage()
          }
          await saveUserToDB(user)
        } else {
          console.log("user exist in db")
        }


      }


    }
    updateUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
