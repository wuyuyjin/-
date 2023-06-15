
import axios from "axios";
import useSWR from "swr";
import {
    Card,
    CardBody,
    Divider,
    Heading,
    Stack,
    Text,
    Image,
    Center, Button, ButtonGroup, CardFooter
} from "@chakra-ui/react";

interface InterfacePersonalData {
    companyName: string;
    interviewResult: string;
    interviewTime: string;
    jobRequirements: string;
    positionId: string;
    rid: number;
    skillRequirements: string;
    userId: string,
    positionName: string
}

const InterviewInfomation = () => {

    const {data: personalData} = useSWR<InterfacePersonalData>('/api/personal-data', async () => {
        const response = await axios.get('/api/recruitment/interview', {
            params: {
                staffId: sessionStorage.getItem("id")
            },
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        });
        console.log(response);
        return response.data.data;
    });

    if (!personalData) {
        return <div>Loading...</div>;
    }

    return (
        <Center>
        <Card maxW="5xl" boxShadow='dark-lg' p='6' rounded='md' bg='white'>
            <CardBody>
                <Image
                    src='https://thumbs.dreamstime.com/z/%E8%B0%B7%E6%AD%8C%E5%85%AC%E5%8F%B8-%E9%83%A8-42366908.jpg'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{personalData.companyName}</Heading>
                    <Text>这是由吴裕锦，黄晖原，高健杰，李晨光和敖卓鹏所创建的一家高科技公司，所拥有的专利数不胜数，欢迎各大校友前来面试</Text>
                    <Text>
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        面试时间：{personalData.interviewTime}
                    </Text>
                    <Text>面试岗位：{personalData.positionName}</Text>
                    <Text>技能要求：{personalData.skillRequirements}</Text>
                    <Text>学历要求：{personalData.jobRequirements}</Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='ghost' colorScheme='blue'>
                        已参加
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
        </Center>
    )
}

export default InterviewInfomation