import {Text, SafeAreaView, StyleSheet, View} from "react-native";
import Colors from "@/constants/Colors";
import {useOAuth} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import SocialBtn from "@/components/ui/buttons/SocialBtn";

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
}

const Index = () => {
    const router = useRouter();
    const {startOAuthFlow: googleAuth} = useOAuth({strategy: Strategy.Google});
    const {startOAuthFlow: appleAuth} = useOAuth({strategy: Strategy.Apple});

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
        }[strategy];

        try {
            const {setActive, createdSessionId, signUp} = await selectedAuth();
            if (createdSessionId) {
                const createdUserId = signUp?.createdUserId;
                await setActive!({session: createdSessionId});
                if (signUp && createdUserId) {
                    console.log('User signed up:', createdUserId)
                    router.navigate('/(auth)/onboarding');
                } else {
                    router.navigate('/(app)/home');
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>Meffin</Text>
            </View>
            <View style={styles.loginContainer}>
                <SocialBtn iconName={"logo-google"} buttonText={"Continue with Google"}
                           onPress={() => onSelectAuth(Strategy.Google)}/>
                <SocialBtn iconName={"logo-apple"} buttonText={"Continue with Apple"}
                           onPress={() => onSelectAuth(Strategy.Apple)}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 50,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        fontSize: 52,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    loginContainer: {
        gap: 20,
        padding: 20,
    },
})

export default Index;