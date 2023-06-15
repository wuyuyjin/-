import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    FormControl,
    HStack,
    Heading,
    Input,
    Text,
    VStack, chakra,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import {Link, useNavigate} from "react-router-dom";
import ky from "ky";


const ReLink = chakra(Link)

const userInfo = zod.object({
    email: zod.string().email({message: '请输入正确的Email'}),
    verify: zod.string().min(6, '密码需要输入6位').max(15, '密码最长15位'),
});

type FormTypes = zod.infer<typeof userInfo>

const Login = () => {
    // 定义一个编程导航的对象
    const navigate = useNavigate()

    // 用到了react hook from里的表单验证的功能
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<FormTypes>({
        resolver: zodResolver(userInfo),
    });
    const onSubmit = async (data: FormTypes) => {
        try {
            const json: any = await ky
                .post('/api/user/login', {
                    json: {
                        email: data.email,
                        loginMethod: 1,
                        verify: data.verify,
                    },
                })
                .json();
            console.log(json.data);
            const token = json.data.token
            sessionStorage.setItem("token", token)
            console.log(sessionStorage.getItem("token"))
            sessionStorage.setItem("email", data.email)
            console.log(sessionStorage.getItem("email"))
            navigate('/homePage');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Center>
            <Card h={450} w={400} mt={36} boxShadow='dark-lg' p='6' rounded='md' bg='white'>
                <CardHeader textAlign="center">
                    <Heading size="md">人力资源管理系统</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl>
                                <Input
                                    {...register('email')}
                                    placeholder="请输入Email"
                                    type="text"
                                />
                                <Text fontSize="xs" color="tomato">
                                    {errors.email?.message}
                                </Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register('verify')} placeholder="请输入密码" type="password"/>
                                <Text fontSize="xs" color="tomato">
                                    {errors.verify?.message}
                                </Text>
                            </FormControl>
                            <Center>
                                <Button mt={12} w={360} colorScheme="teal" type="submit" isLoading={isSubmitting}>
                                    登录
                                </Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack w="100%" justify="space-between">
                        <ReLink color="teal.500" to="/register">注册</ReLink>
                        <ReLink color="teal.500" to="/CodeEmail">验证码登录</ReLink>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    );
}

export default Login