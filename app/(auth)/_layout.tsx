import {Stack} from "expo-router";


const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    presentation: 'containedTransparentModal',
                }}
            />
            <Stack.Screen
                name="onboarding"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}


export default AuthLayout;