import {Text, SafeAreaView, StyleSheet, View, TouchableOpacity} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import {useOAuth} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

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
            if (createdSessionId && setActive) {
                await setActive({session: createdSessionId});
                if (signUp && signUp.createdUserId) {
                    console.log('User signed up:', signUp.createdUserId)
                    // TODO: go to onboarding
                }
            }
            router.navigate('/(app)/home');
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
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name="logo-google" size={24} style={styles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name="logo-apple" size={24} style={styles.btnIcon}/>
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
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
    btnOutline: {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
})

export default Index;