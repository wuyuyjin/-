import {
    Card,
    CardBody,
    CardHeader,
    Center,
    HStack,
    Image, Text,
    VStack
} from "@chakra-ui/react";
import {IconArrowLeft} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import EditModelHumen from "./editModelHumen";
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


const PersonalInfo = () => {
    const [departmentName, setDepartmentName] = useState('')

    const staffId = sessionStorage.getItem('id')
    const {data: personalData} = useSWR<InterfacePersonalData>('/api/personal-data', async () => {
        const response = await axios.get(`/api/user/staff/${staffId}`, {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        });
        setDepartmentName(response.data.data.department.departmentName)
        return response.data.data.userVO;
    });

    if (!personalData) {
        return <div>Loading...</div>;
    }

    sessionStorage.setItem('personalData', JSON.stringify(personalData))

    return (
        <Center mt={4}>
            <VStack spacing={4}>
                <Card w={1100} h={200}
                      className="bg-gradient-to-r from-indigo-500 shadow">
                    <CardHeader>
                        <HStack w="100%" justify="space-between">
                            <Link to="/homePage"><IconArrowLeft/></Link>
                            <Text fontSize="28" fontWeight="700">个人信息</Text>
                            {/*编辑信息*/}
                            <EditModelHumen/>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        <HStack spacing={8}>
                            <Image
                                borderRadius='full'
                                boxSize='90px'
                                src='https://bit.ly/dan-abramov'
                                alt='Dan Abramov'
                            />
                            <Text>姓名：{personalData.name}</Text>
                            <Text>账号：{personalData.contact}</Text>
                            <Text>年龄：{personalData.age}</Text>
                            <Text>性别：{personalData.gender}</Text>
                            <Text>籍贯：{personalData.birthplace}</Text>
                        </HStack>
                    </CardBody>
                </Card>

                <Card w={1100} h={450} boxShadow='dark-lg' p='6' rounded='md' bg='white'>
                    <CardBody fontSize="lg">
                        <Text mt={8}>部门：{departmentName}</Text>
                        <Text mt={8}>职级：{personalData.jobLevel}</Text>
                        <Text mt={8}>教育背景：{personalData.education}</Text>
                        <Text mt={8}>工作经历：{personalData.workExperience}</Text>
                        <Text mt={8}>身份证：{personalData.idCard}</Text>
                    </CardBody>
                </Card>
            </VStack>
        </Center>
    )
}

export default PersonalInfo