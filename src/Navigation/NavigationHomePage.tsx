import {IconButton, VStack} from "@chakra-ui/react";
import {IconAdjustmentsAlt, IconFileInvoice, IconHome2} from "@tabler/icons-react";
import {Link} from "react-router-dom";

// 侧边栏
const NavigationHomePage = () => {
    return (
        <VStack w={32} h={360} mt="2" ml={2}>
            <Link to="/homePage">
                <IconButton
                    color="white"
                    colorScheme='blackAlpha'
                    variant='ghost'
                    aria-label='Call Segun'
                    size='lg'
                    w={28}
                    mt="4"
                    className="relative bg-gray-200 hover:scale-150 transition-transform duration-300"
                    icon={<IconHome2/>}
                ></IconButton>
            </Link>

            <Link to="/indexRecruitment">
                <IconButton
                    color="white"
                    colorScheme='blackAlpha'
                    variant='ghost'
                    aria-label='Call Segun'
                    size='lg'
                    w={28}
                    mt="4"
                    className="relative bg-gray-200 hover:scale-150 transition-transform duration-300"
                    icon={<IconAdjustmentsAlt/>}
                ></IconButton>
            </Link>

            <Link to="/indexInterviewInfomation">
                <IconButton
                    color="white"
                    colorScheme='blackAlpha'
                    variant='ghost'
                    aria-label='Call Segun'
                    size='lg'
                    w={28}
                    mt="4"
                    className="relative bg-gray-200 hover:scale-150 transition-transform duration-300"
                    icon={<IconFileInvoice />}
                ></IconButton>
            </Link>
        </VStack>
    )
}

export default NavigationHomePage