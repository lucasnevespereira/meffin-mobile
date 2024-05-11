import {Text, SafeAreaView, StyleSheet, View, Button} from 'react-native';
import {useAuth, useUser} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

const SignInButton = () => {
   const router = useRouter();
    return (
        <View>
            <Button title="Sign In" onPress={() => {
                router.navigate('(auth)')
            }}/>
        </View>
    )
}

const SignOutButton = () => {
    const {isLoaded, signOut} = useAuth();
    if (!isLoaded) return null
    return (
        <View>
            <Button title="Sign Out" onPress={() => {
                signOut()
            }}/>
        </View>
    )
}

const Profile = () => {
    const {user} = useUser()
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {user ? (
                <View>
                    <Text>{user.fullName}</Text>
                    <SignOutButton/>
                </View>
            ) : (
                <View>
                    <Text>You are not signed in</Text>
                    <SignInButton />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});


export default Profile;