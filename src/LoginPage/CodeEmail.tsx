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
import {useState} from "react";
import axios from "axios";

const ReLink = chakra(Link)


const userInfo = zod.object({
    email: zod.string().email({message: '请输入正确的email'}),
    verify: zod.string().length(6, '六位验证码哦！')
});


type FormTypes = zod.infer<typeof userInfo>

const CodeEmail = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormTypes>({
        resolver: zodResolver(userInfo),
    });

    // 登录
    const onSubmit = async (data: FormTypes) => {
        axios.post(`/api/user/login`,{
            email: data.email,
            loginMethod: 2,
            verify: data.verify,
        }).then(response => {
            const token = response.data.data.token
            sessionStorage.setItem('token',token)
            navigate('/homePage')
        }).catch(error => {
            console.log(error)
        })
    };

    // 发送验证码
    const onSubmitCode = () => {
        axios.post("/api/code/verifyCode", {
            email: email
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Center>
            <Card h={450} w={400} mt={36}>
                <CardHeader textAlign="center">
                    <Heading size="md">人力资源管理系统</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={6}>
                            <FormControl>
                                <Input
                                    {...register('email')}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="请输入Email"
                                    type="email"
                                />
                                <Text fontSize="xs" color="tomato">
                                    {errors.email?.message}
                                </Text>
                            </FormControl>
                            <FormControl>
                                <HStack w="100%" justify="space-between">
                                    <Input
                                        {...register('verify')}
                                        placeholder="请输入验证码"
                                        type="text"
                                        w={200}
                                    />
                                    <Button colorScheme="teal" onClick={onSubmitCode}>发送验证码</Button>
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <Text fontSize="xs" color="tomato">
                                    {errors.verify?.message}
                                </Text>
                            </FormControl>
                            <Center>
                                <Button mt={12} w={360} colorScheme="teal" type="submit">
                                    登录
                                </Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack w="100%" justify="space-between">
                        <ReLink color="teal.500" to="/register">注册</ReLink>
                        <ReLink color="teal.500" to="/">密码登录</ReLink>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    );
}

export default CodeEmail
