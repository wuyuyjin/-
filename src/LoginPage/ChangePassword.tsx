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
    VStack,
} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as zod from 'zod';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const userInfo = zod.object({
    password: zod.string().min(6, "密码至少需要6位哦！").max(20, "最多只能是20位！"),
    confirmPassword: zod.string().min(6, "密码至少需要6位哦！").max(20, "最多只能是20位！"),
    code: zod.string().length(6, '六位验证码哦！')
});


type FormTypes = zod.infer<typeof userInfo>

const ChangePassword = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormTypes>({
        resolver: zodResolver(userInfo),
    });

    // 登录
    const onSubmit = async (data: FormTypes) => {
        axios.put(`/api/user/password`, {
            code: data.code,
            confirmPassword: data.confirmPassword,
            password: data.password
        },{
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
            navigate('/homePage')
        }).catch(error => {
            console.log(error)
        })
    };

    // 发送验证码
    const onSubmitCode = () => {
        axios.post("/api/code/verifyCode", {
            email: sessionStorage.getItem("email")
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
            <Card h={520} w={400} mt={36}>
                <CardHeader textAlign="center">
                    <Heading size="md">人力资源管理系统</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <FormControl>
                                <HStack w="100%" justify="space-between">
                                    <Input
                                        {...register('password')}
                                        placeholder="请输入新密码"
                                        type="password"
                                        w={420}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <Text fontSize="xs" color="tomato">
                                    {errors.password?.message}
                                </Text>
                            </FormControl>
                            <FormControl>
                                <HStack w="100%" justify="space-between">
                                    <Input
                                        {...register('confirmPassword')}
                                        placeholder="确认新密码"
                                        type="password"
                                        w={400}
                                    />
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <Text fontSize="xs" color="tomato">
                                    {errors.confirmPassword?.message}
                                </Text>
                            </FormControl>
                            <FormControl>
                                <HStack w="100%" justify="space-between">
                                    <Input
                                        {...register('code')}
                                        placeholder="请输入验证码"
                                        type="text"
                                        w={200}
                                    />
                                    <Button colorScheme="teal" onClick={onSubmitCode}>发送验证码</Button>
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <Text fontSize="xs" color="tomato">
                                    {errors.code?.message}
                                </Text>
                            </FormControl>
                            <Center>
                                <Button mt={12} w={360} colorScheme="teal" type="submit">
                                    修改密码
                                </Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack w="100%" justify="space-between">

                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    );
}

export default ChangePassword
