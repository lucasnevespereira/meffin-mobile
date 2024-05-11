import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome to Meffin</Text>
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


export default Home;