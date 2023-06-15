import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod"
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Center, chakra,
    FormControl,
    Heading, HStack,
    Input,
    Text, VStack
} from "@chakra-ui/react";
import ky from "ky";
import {Link, useNavigate} from "react-router-dom";

interface FormData {
    name: string,
    email: string,
    password: string,
    checkPassword: string,
}

const ReLink = chakra(Link)

const userInfo = zod.object({
    name: zod.string(),
    email: zod.string().email({message: "请输入正确的Email"}),
    password: zod.string().min(6, "至少需要六位密码哦！").max(15, "密码长度太长了！"),
    checkPassword: zod.string().min(6, "至少需要六位密码哦！").max(15, "密码长度太长了！"),
}).refine((FormData) => FormData.password === FormData.checkPassword, {
    path: ["checkPassword"],
    message: "两次的密码不一致哦！"
})

const Register = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>({
        resolver: zodResolver(userInfo)
    });
    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {
        try {
            const json = await ky.post( "/api/user/register", {
                json: {
                    checkPassword: data.checkPassword,
                    email: data.email,
                    name: data.name,
                    password: data.password,
                }
            }).json()
            console.log(data)
            console.log(json)
            navigate("/")
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Center>
            <Card h={600} w={400} mt={20} boxShadow='dark-lg' p='6' rounded='md' bg='white'>
                <CardHeader textAlign="center">
                    <Heading size="md">人力资源管理系统</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={8}>
                            <FormControl>
                                <Input {...register("name")} type="text" placeholder="请输入名字"/>
                                <Text fontSize="xs" color="tomato">{errors.name?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register("email")} type="text" placeholder="请输入Email"/>
                                <Text fontSize="xs" color="tomato">{errors.email?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register("password")} type="password" placeholder="请输入密码"/>
                                <Text fontSize="xs" color="tomato">{errors.password?.message}</Text>
                            </FormControl>
                            <FormControl>
                                <Input {...register("checkPassword")} type="password" placeholder="请重复输入密码"/>
                                <Text fontSize="xs" color="tomato">{errors.checkPassword?.message}</Text>
                            </FormControl>
                            <Center>
                                <Button mt={12} w={360} type="submit" colorScheme='teal'
                                        isLoading={isSubmitting}>注册</Button>
                            </Center>
                        </VStack>
                    </form>
                </CardBody>
                <CardFooter>
                    <HStack w="100%" justify="space-between">
                        <ReLink color='teal.500' to='/'>密码登录</ReLink>
                        <ReLink color='teal.500' to='/codeEmail'>验证码登录</ReLink>
                    </HStack>
                </CardFooter>
            </Card>
        </Center>
    )
}

export default Register