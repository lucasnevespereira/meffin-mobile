import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";


const Onboarding = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>OnBoarding Screen</Text>
            <TouchableOpacity  onPress={() => {router.navigate('/(app)/home');}}>
                <Text>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
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
})

export default Onboarding;