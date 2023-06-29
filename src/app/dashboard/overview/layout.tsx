'use client'
import React, { ReactNode } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiSearch,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Heading } from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DrawerExample from '@/app/components/notificate';




export default function SimpleSidebar({ children }: { children: ReactNode }) {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        
        <Box
            bg={useColorModeValue('purple', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="37%"
            flexDir="column"
            alignItems="center"
            backgroundColor="purple"
            color="#fff"
            rounded="15"
            mt="70px"
            mb={1}
            ml={-3}
            {...rest}>

                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            <Flex
                    flexDir="column"
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading mt={50} mb={100} fontSize="4xl" alignSelf="center" 
                        letterSpacing="tight">
                                EV CHARGER
                        </Heading>
                        <Flex px={7} mt={-10} flexDir="column" align="flex-start" justifyContent="center" fontSize="lg">
                            <Flex className="sidebar-items">
                                <Link>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon"/>
                                </Link>
                                <Link href="/dashboard/overview" _hover={{ textDecor:'none' }}>
                                    <Text className="active" px={5}>HOME</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mt={5}>
                                <Link>
                                    <Icon as={FiTrendingUp} fontSize="2xl" className="active-icon"/>
                                </Link>
                                <Link href="/addcharger" _hover={{ textDecor:'none' }}>
                                    <Text className="active" px={5}>REGISTER</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mt={5}>
                                <Link>
                                    <Icon as={RiDeleteBin6Line} fontSize="2xl" className="active-icon"/>
                                </Link>
                                <Link href="/del" _hover={{ textDecor:'none' }}>
                                    <Text className="active" px={5}>EDIT/DELETE</Text>
                                </Link>
                            </Flex>
                        </Flex>        
                    </Flex>
                </Flex>       
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>

            <Flex
                mt={10}
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'purple.400',
                    color: 'white',
                }}

                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};