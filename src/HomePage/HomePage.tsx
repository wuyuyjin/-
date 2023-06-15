// 首页也是所有人员信息
import {
    Box, Button, ButtonGroup,
    Center,  Container, Divider, Flex,
    Grid, GridItem, Heading, HStack, Link, Spacer,
} from "@chakra-ui/react";
import EmployeeInformation from "./EmployeeInformation";
import {useNavigate} from "react-router-dom";
import NavigationHomePage from "../Navigation/NavigationHomePage";
import useSWR from "swr";
import axios from "axios";
import {useState} from "react";

interface InterfacePersonalData {
    name: string,
    contact: string,
    age: string,
    gender: string,
    birthplace: string,
    id: string,
    department: string,
    idCard: string,
    jobLevel: string,
    workExperience: string,
    salary: string,
    education: string
}

const HomePage = () => {
    const navigate = useNavigate()
    const logOut = async () => {
        sessionStorage.removeItem("name")
        sessionStorage.removeItem("token")
        navigate("/")
        console.log('退出登录')
    }

    const myInfo = async () => {
        console.log("个人信息")
        navigate('/personalInfo')
    }
    const [name, setName] = useState("")

    const {data: personalData} = useSWR<InterfacePersonalData>('/api/personal-data', async () => {
        const response = await axios.get('/api/user', {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        });
        console.log(response)
        setName(response.data.data.name)
        return response.data.data;
    });

    const change = () => {
      navigate("/ChangePassword")
    }

    sessionStorage.setItem("name", name)

    if (!personalData) {
        return <div>Loading...</div>;
    }

    return (
        <Center>
            <Grid
                templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'165px 1fr'}
                h='700px'
                w="100%"
                gap='1'
                className="absolute inset-x-0 top-0 h-[37px] backdrop-blur-xl overflow-hidden"
                fontWeight='bold'
            >
                <GridItem pl='2' area={'header'} bg="white" className="bg-gradient-to-r from-indigo-500">
                    <Flex minWidth='max-content' alignItems='center' gap='2'>
                        <HStack w="97%" justify="space-between" ml="2%">
                            <Box p='2'>
                                <Heading size='lg'>{name}</Heading>
                            </Box>
                            <Spacer/>
                            <ButtonGroup gap='2'>
                              <Button colorScheme='teal' variant='link' onClick={() => change()}>修改密码</Button>
                                <Link color='teal' onClick={() => myInfo()}>我的</Link>
                                <Link color='teal' onClick={() => logOut()}>退出登陆</Link>
                            </ButtonGroup>
                        </HStack>
                    </Flex>
                    <Divider orientation='horizontal'/>
                </GridItem>
                <GridItem pl='2' bg='blue.400' area={'nav'}>
                    <NavigationHomePage/>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <EmployeeInformation/>
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    <Container>
                        吴裕锦，高健杰，黄晖原，敖卓鹏，李晨光有限公司
                    </Container>
                </GridItem>
            </Grid>
        </Center>
    )
}

export default HomePage