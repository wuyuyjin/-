import {Card, HStack, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import Name from "../API/Name";

// 所有人员信息
interface list {
    id: string,
    name: string,
    birthplace: string,
    education: string
}

const EmployeeInformation = () => {
    const navigate = useNavigate()

    const {data: List} = useSWR<list[]>('/api/user/staffs', async () => {
        const response = await axios.get('/api/user/staffs', {
            headers: {
                'Authorization': sessionStorage.getItem("token")
            }
        });
        console.log(response)
        return response.data.data;
    })

    const deleteItem = (staffId: string) => {
        axios.delete(`/api/user/staff/${staffId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("token"),
            },
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    const submit = (person: list) => {
        // console.log(person.id)
        const id = person.id
        sessionStorage.setItem('id', id)
        console.log(sessionStorage.getItem("id"))
        navigate("/humenInfoData")
    }

    return (
        <Card>
            <TableContainer textAlign="center">
                <Table variant='simple'>
                    <Thead h="24">
                        <Tr>
                            <Th textAlign="center" fontSize="2xl">Name</Th>
                            <Th textAlign="center" fontSize="2xl">BirthPlace</Th>
                            <Th textAlign="center" fontSize="2xl">Education</Th>
                            <Th fontSize="2xl">operation</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="overflow-y-scroll" h="12">
                        {Array.isArray(List) && List.map((person) => (
                            <Tr>
                                <Td textAlign="center">{person.name}</Td>
                                <Td textAlign="center">{person.birthplace}</Td>
                                <Td textAlign="center">{person.education}</Td>
                                <Td>
                                    <HStack spacing="4">
                                        <Link color='blue.500' onClick={() => submit(person)}>详情</Link>
                                        {
                                            Name == "吴裕锦" &&
                                            <Link color='red' onClick={() => deleteItem(person.id)}>删除</Link>
                                        }
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            </TableContainer>
        </Card>
    )
}

export default EmployeeInformation