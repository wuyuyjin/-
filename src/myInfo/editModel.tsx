import {
    Button, Card, CardBody, Center, FormControl, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    Text, useDisclosure, VStack,
} from "@chakra-ui/react";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import * as zod from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
// import ky from "ky";
import axios from "axios";

const userInfo = zod.object({
    name: zod.string(),
    gender: zod.string(),
    idCard: zod.string().regex(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/),
    contactInformation: zod.string().regex(/^\d{11}$/),
    // jobLevel: zod.string(),
    workExperience: zod.string(),
    education: zod.string(),
    birthplace: zod.string(),
    depId: zod.string(),
    jobId: zod.string()
});

type FormTypes = zod.infer<typeof userInfo>

const EditModelHumen = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    //todo jobLevel deleted gmt password userType
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [idCard, setIdCard] = useState("");
    const [contactInformation, setContactInformation] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [education, setEducation] = useState("")
    const [birthplace, setBirthplace] = useState("")
    const [id, setId] = useState("")
    const [list, setList] = useState<{ depId: string; departmentName: string }[]>([])
    const [jobLevel, setJobLevel] = useState<{jobId: string; department: string; baseSalary: string;positionName: string}[]>([])

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormTypes>({
        resolver: zodResolver(userInfo),
    });

    const onSubmit = async (data: FormTypes) => {
        axios.put('/api/user', {
            name: data.name,
            id: id,
            contactInformation: data.contactInformation,
            education: data.education,
            gender: data.gender,
            idCard: data.idCard,
            jobLevel: data.jobId,
            workExperience: data.workExperience,
            depId: data.depId,
            jobId: data.jobId,


        }, {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
            console.log(121212121211)
        }).catch(error => {
            console.log(error)
        })

    };

    const selectSubmit = () => {
        axios.get("/api/user/departments", {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
            setList(response.data.data)

        }).catch(error => {
            console.log(error)
        })
    }

    const selectJobLevelSubmit = () => {
        axios.get("/api/user/jobLevels",{
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
            setJobLevel(response.data.data);
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        const savedData = sessionStorage.getItem("personalData");
        sessionStorage.removeItem("personalData");
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setName(parsedData.name)
            setGender(parsedData.gender)
            setIdCard(parsedData.idCard)
            setContactInformation(parsedData.contactInformation)
            setEducation(parsedData.education)
            // setJobLevel(parsedData.jobLevel)
            setWorkExperience(parsedData.workExperience)
            setBirthplace(parsedData.birthplace)
            setId(parsedData.id)
        }
    }, []);

    return (
        <>
            <Button colorScheme="blue" onClick={onOpen}>编辑信息</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>修改个人信息</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Center>
                            <Card w="100%">
                                <CardBody>
                                    <form onSubmit={handleSubmit(onSubmit)} id="user_form">
                                        <VStack spacing={6}>
                                            <FormControl>
                                                <Input
                                                    {...register('name')}
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="姓名"
                                                    type="text"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.name?.message}
                                                </Text>
                                            </FormControl>
                                            <FormControl>
                                                <Input
                                                    {...register('gender')}
                                                    value={gender}
                                                    onChange={e => setGender(e.target.value)}
                                                    placeholder="年龄"
                                                    type="number"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.gender?.message}
                                                </Text>
                                            </FormControl>
                                            <FormControl>
                                                <Input
                                                    {...register('birthplace')}
                                                    value={birthplace}
                                                    onChange={e => setBirthplace(e.target.value)}
                                                    placeholder="籍贯"
                                                    type="text"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.gender?.message}
                                                </Text>
                                            </FormControl>
                                            <FormControl>
                                                <Input
                                                    {...register('idCard')}
                                                    value={idCard}
                                                    onChange={e => setIdCard(e.target.value)}
                                                    placeholder="身份证号码"
                                                    type="text"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.idCard?.message}
                                                </Text>
                                            </FormControl>
                                            <FormControl>
                                                <Select placeholder='部门' onClick={selectSubmit}>
                                                    {list.map((list) => (
                                                        <option {...register('depId')}
                                                                value={list.depId}>{list.departmentName}</option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <Select placeholder='职位' onClick={selectJobLevelSubmit}>
                                                    {jobLevel.map((item) => (
                                                        <option {...register('jobId')} value={item.jobId}>
                                                            {item.positionName}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <Input
                                                    {...register('contactInformation')}
                                                    value={contactInformation}
                                                    onChange={e => setContactInformation(e.target.value)}
                                                    placeholder="联系方式"
                                                    type="contactInformation"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.contactInformation?.message}
                                                </Text>
                                            </FormControl>

                                            <FormControl>
                                                <Input
                                                    {...register('workExperience')}
                                                    value={workExperience}
                                                    onChange={e => setWorkExperience(e.target.value)}
                                                    placeholder="工作经历"
                                                    type="text"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.workExperience?.message}
                                                </Text>
                                            </FormControl>
                                            <FormControl>
                                                <Input
                                                    {...register('education')}
                                                    value={education}
                                                    onChange={e => setEducation(e.target.value)}
                                                    placeholder="学历"
                                                    type="text"
                                                />
                                                <Text fontSize="xs" color="tomato">
                                                    {errors.education?.message}
                                                </Text>
                                            </FormControl>
                                        </VStack>
                                    </form>
                                </CardBody>
                            </Card>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            关闭
                        </Button>
                        <Button variant='ghost' onClick={onClose} form="user_form" type="submit">确定修改</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModelHumen