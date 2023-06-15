import {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader, HStack,
    Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select, SimpleGrid,
    Text, useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import Name from "../API/Name";


interface ArrayItem {
    positionId: string;
    positionName: string;
    companyName: string;
    jobRequirements: string;
    salary: string;
    skillRequirements: string
}

const Recruitment = () => {
    const [array, setArray] = useState<ArrayItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>("")
    const [jobRequirements, setJobRequirements] = useState<string>("")
    const [salary, setSalary] = useState<string>("")
    const [skillRequirements, setSkillRequirements] = useState<string>("")
    const [positionName, setPositionName] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const addItem = () => {
        if (inputValue !== '' && companyName !== '') {
            const newItem: ArrayItem = {
                positionId: '',
                positionName: inputValue,
                companyName: companyName,
                jobRequirements: jobRequirements,
                salary: salary,
                skillRequirements: skillRequirements,
            };
            setArray([...array, newItem]);
            setInputValue('');
            setCompanyName('')
            setJobRequirements('')
            setSalary('')
            setSkillRequirements('')
            setPositionName('')
            console.log(newItem.positionId)
            axios.post('/api/recruitment/positions', {
                companyName: newItem.companyName,
                jobRequirements: newItem.jobRequirements,
                positionId: newItem.positionId,
                positionName: newItem.positionName,
                salary: newItem.salary,
                skillRequirements: newItem.skillRequirements
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem("token")
                }
            }).then(response => {
                console.log(response)
                console.log(positionName)
            }).catch(error => {
                console.log(error)
            })
        }
    };

    const deleteItem = (positionId: string) => {
        const newArray = array.filter(item => item.positionId !== positionId);
        setArray(newArray);
        console.log(positionId)
    };

    const joinItem = (positionId: string) => {
        console.log(positionId)
        const date = new Date();

        function padZero(num: number): string {
            return num < 10 ? `0${num}` : `${num}`;
        }

        const interviewTime = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;

        axios.post('/api/recruitment/interview', {
            interviewTime: interviewTime,
            positionId: positionId,
            userId: ''
        }, {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }


    const {isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal} = useDisclosure()
    // 添加信息
    const addBasicUsage = () => {
        return (
            <>
                <Button onClick={openAddModal} colorScheme="blue" mt="2">发布招聘</Button>
                <Box>
                    <Modal isOpen={isAddModalOpen} onClose={closeAddModal} scrollBehavior="inside"
                           blockScrollOnMount={false}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>添加信息</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                positionName岗位名称:<Input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                                companyName公司名称:<Input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                                jobRequirements岗位要求:<Input
                                type="text"
                                value={jobRequirements}
                                onChange={(e) => setJobRequirements(e.target.value)}
                            />
                                salary岗位薪资:<Input
                                type="text"
                                value={salary}
                                onChange={event => setSalary(event.target.value)}
                            />
                                skillRequirements技能要求:<Input
                                type="text"
                                value={skillRequirements}
                                onChange={event => setSkillRequirements(event.target.value)}
                            />
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme="teal" mr={3} onClick={closeAddModal}>
                                    关闭
                                </Button>
                                <Button onClick={addItem} onChange={closeAddModal} colorScheme='blue'>确认</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </>
        )
    }

    // 删除
    const {isOpen: deleteOneItemIsOpen, onOpen: deleteOneItemOnpen, onClose: deleteOneItemOnClose} = useDisclosure()
    const deleteOneItem = (positionId: string) => {
        return (
            <>
                <Button variant='ghost' onClick={deleteOneItemOnpen} colorScheme="red" size="sm">删除</Button>

                <Modal closeOnOverlayClick={false} isOpen={deleteOneItemIsOpen} onClose={deleteOneItemOnClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>删除</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <Text>确定要删除该招聘信息吗？可能无法恢复咯！</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={() => deleteItem(positionId)} colorScheme="blue">
                                确认
                            </Button>
                            <Button onClick={deleteOneItemOnClose} colorScheme="teal">取消</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const {isOpen: joinOneItemIsOpen, onOpen: joinOneItemOnOpen, onClose: joinOneItemOnClose} = useDisclosure()
    const joinOneItem = (positionId: string) => {
        return (
            <>
                <Button variant='ghost' onClick={joinOneItemOnOpen} colorScheme="blue" color="blue.600"
                        size="sm">申请</Button>

                <Modal closeOnOverlayClick={false} isOpen={joinOneItemIsOpen} onClose={joinOneItemOnClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>参加</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody pb={6}>
                            <Text>确定要参加这个面试吗？</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={() => joinItem(positionId)} colorScheme="blue">
                                确认
                            </Button>
                            <Button onClick={joinOneItemOnClose} colorScheme="teal">取消</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const {data: dataArray} = useSWR<ArrayItem>("/api/recruitment/positions", async () => {
        const response = await axios.get('/api//recruitment/positions', {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        });
        // console.log(response)
        setArray(response.data.data)
        console.log(dataArray)
        return response.data.data;
    });

    if (!dataArray) {
        return <div>Loading...</div>;
    }

    // 排序的方法
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSortOrder: "asc" | "desc" = event.target.value as "asc" | "desc";
        setSortOrder(selectedSortOrder);
    };

    const sortedArray = [...array].sort((a, b) => {
        const salaryA = Number(a.salary);
        const salaryB = Number(b.salary);
        if (sortOrder === 'asc') {
            return salaryA - salaryB;
        } else {
            return salaryB - salaryA;
        }
    });

    return (
        <Box>
            <HStack spacing="4" ml="1100" mt="2">
            <Select bg="twitter.400" onChange={handleSortChange} placeholder="工资排序" w="32">
                <option value="asc">从小到大</option>
                <option value="desc">从大到小</option>
            </Select>
            {Name == "吴裕锦" && addBasicUsage()}
            </HStack>
            <ul>
                <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(320px, 1fr))'>
                    {sortedArray.map((item) => (
                        <Card key={item.positionId} mt="4" ml="2" boxShadow='xl' p='6' rounded='md' bg='white'
                              className="relative w-76 h-72 bg-gray-200 hover:scale-110 transition-transform duration-300">
                            <CardHeader>
                                <HStack w="100%" justify="space-between">
                                    <Text fontSize="xl">
                                        招聘信息
                                    </Text>

                                    <Box>
                                        <HStack spacing="2">
                                            {
                                                Name == "吴裕锦" &&
                                                deleteOneItem(item.positionId)
                                            }
                                            {
                                                Name != "吴裕锦" &&
                                                joinOneItem(item.positionId)
                                            }
                                        </HStack>
                                    </Box>


                                </HStack>
                            </CardHeader>
                            <hr/>
                            <CardBody>
                                <Text>公司名字：{item.companyName}</Text>
                                <Text>岗位名称：{item.positionName}</Text>
                                <Text>岗位薪资：{item.salary}</Text>
                                <Text>岗位要求：{item.jobRequirements}</Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </ul>
        </Box>
    );
}

export default Recruitment
