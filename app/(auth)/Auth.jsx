import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text, View, Button, BackHandler, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useOAuth, useAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import AuthCard from '@/components/AuthCard';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { firedb } from '@/lib/Firebase';




const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();


const syncUserToFirestore = async ({ id, emailAddresses, firstName, lastName }) => {
  try {
    console.log('Syncing user to Firestore:', { id, emailAddresses, firstName, lastName });
    const emailAddress = emailAddresses?.length > 0 ? emailAddresses[0].emailAddress : "null";

   
    // Get a reference to the 'users' collection
    const usersRef = collection(firedb, 'users');
    // Get a reference to the specific user document
    const userDocRef = doc(usersRef, id);
    // Check if the user document exists
    const userDoc = await getDoc(doc(usersRef, id));

    if (!userDoc.exists()) {
      // Create a new user document in Firestore
      await setDoc(userDocRef, {
        email: emailAddress,
        firstName,
        lastName,
        createdAt: new Date(),
        wishlist: [], 
        trackedProducts: [] 
      });
      console.log('User synced to Firestore');
    } else {
      console.log('User already exists in Firestore');
    }
  } catch (error) {
    console.error('Error syncing user to Firestore:', error);
  }
};


const Auth = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { isLoaded, sessionId, isSignedIn } = useAuth();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const [userLoading, setUserLoading] = React.useState(true);

  const { user } = useUser();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Exit app when pressing back on Auth screen
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      if (sessionId) {
        router.replace('/(tabs)/Home');
      } else if (!isSignedIn) {
        setUserLoading(false);
      }
    }
  }, [isLoaded, sessionId, isSignedIn]);

  React.useEffect(() => {
    const syncUser = async () => { if (user) { await syncUserToFirestore(user); } };
    if (user) {
      syncUser();
     }
  }, [user]);

  const onPress = React.useCallback(async () => {
    try {
      // We still need redirectUrl for OAuth to complete
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/') // Redirect to root
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Then we can use router.replace to navigate
        router.replace('/(tabs)/Home');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [router, startOAuthFlow]);

  return (
    <>
      {userLoading ? (
        <View className="self-center mt-10">
          <Text>Loading...</Text>
        </View>
      ) : (
        <AuthCard onPress={onPress} />
      )}
    </>
  );
};

export default Auth;