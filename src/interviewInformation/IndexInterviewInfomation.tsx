import {
    Box, Button, ButtonGroup, Card,
    Center, Container, Divider, Flex,
    Grid, GridItem, Heading, HStack, Link, Spacer,
} from "@chakra-ui/react";

import {useNavigate} from "react-router-dom";
import NavigationHomePage from "../Navigation/NavigationHomePage";
import InterviewInfomation from "./InterviewInfomation";
import Name from "../API/Name";

const IndexInterviewInfomation = () => {
    const navigate = useNavigate()
    const logOut = async () => {
        sessionStorage.removeItem("token")
        navigate("/")
        console.log('退出登录')
    }

    const myInfo = async () => {
        console.log("个人信息")
        navigate('/personalInfo')
    }
    const change = () => {
        navigate("/ChangePassword")
    }

    return (
        <Center>
            <Grid
                templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'165px 1fr'}
                h='1300px'
                w="100%"
                gap='1'
                className="absolute inset-x-0 top-0 h-[37px] backdrop-blur-xl rounded-t-2xl overflow-hidden"
                fontWeight='bold'
            >
                <GridItem pl='2' area={'header'} bg="white">
                    <Flex minWidth='max-content' alignItems='center' gap='2'>
                        <HStack w="97%" justify="space-between" ml="2%">
                            <Box p='2'>
                                <Heading size="lg">{Name}</Heading>
                            </Box>
                            <Spacer/>
                            <ButtonGroup gap='2'>
                                <Button colorScheme='teal' variant='link' onClick={() => change()}>修改密码</Button>
                                <Link color='teal' onClick={() => myInfo()}>我的</Link>
                                <Link color='teal' onClick={() => logOut()}>退出登陆</Link>
                            </ButtonGroup>
                        </HStack>
                    </Flex>
                    <Divider orientation='horizontal' border="1px soild black"/>
                </GridItem>
                <GridItem pl='2' bg='blue.600' area={'nav'}>
                    <NavigationHomePage/>
                </GridItem>
                <GridItem pl='2' area={'main'}>
                    <InterviewInfomation/>
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    <Card w="100%">
                        <Container>
                            吴裕锦，高健杰，黄晖原，敖卓鹏，李晨光有限公司
                        </Container>
                    </Card>
                </GridItem>
            </Grid>
        </Center>
    )
}

export default IndexInterviewInfomation