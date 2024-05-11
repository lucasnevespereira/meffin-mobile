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
        </Stack>
    )
}


export default AuthLayout;