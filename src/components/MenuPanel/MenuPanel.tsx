import { DeleteIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Image, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { capitalizeFirstLetter, formattedNumberToMoney } from '../../utils/functions';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import { SaleAction } from '../../store/sales/actions';
import { useSaleStore } from '../../store/sales/slice';
import toast from 'react-hot-toast';
import { MenuPanelProps } from './interfaces';
import { SidebarItemProps } from '../Sidebar/interfaces';
import { Link, useLocation } from 'react-router-dom';
import { FaBox, FaUsers } from 'react-icons/fa';
import { SIDEBAR_ITEMS } from '../../constants/sidebar';

const MenuPanel: FC<MenuPanelProps> = props => {
  const isAdminUser = useSessionStore(state => state.isAdminUser)
  const { pathname } = useLocation()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('pink.50', 'pink.900')
  const activeColor = '#ec0868'

  useEffect(() => {
    props.onClose()
  },[pathname])

  const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isExpanded, subItems }) => {
    const isActive = subItems.some(item => pathname === item.route)

    return (
      <AccordionItem border="none">
        {({ isExpanded: isItemExpanded }) => (
          <>
            <AccordionButton
              py={4}
              px={4}
              borderRadius="md"
              _hover={{ bg: hoverBg }}
              bg={isActive ? hoverBg : 'transparent'}
              transition="all 0.2s"
            >
              <Flex align="center" w="100%" gap={3}>
                <Box 
                  as={icon} 
                  fontSize="20px" 
                  color={isActive ? activeColor : 'gray.600'}
                  transition="all 0.2s"
                />
                <Box 
                  flex="1" 
                  textAlign="left" 
                  fontWeight={isActive ? "600" : "normal"}
                  color={isActive ? activeColor : 'inherit'}
                >
                  {label}
                </Box>
              </Flex>
              <AccordionIcon 
                color={isActive ? activeColor : 'gray.600'}
                transform={isItemExpanded ? 'rotate(-180deg)' : 'rotate(0)'}
                transition="transform 0.2s"
              />
            </AccordionButton>
            <AccordionPanel pb={4} pl={12}>
              <VStack align="start" spacing={3}>
                {subItems.map((item, index) => (
                  <Link key={index} to={item.route} style={{ width: '100%' }}>
                    <Text 
                      fontSize="sm" 
                      py={2}
                      px={3}
                      borderRadius="md"
                      color={pathname === item.route ? activeColor : 'inherit'}
                      fontWeight={pathname === item.route ? "600" : "normal"}
                      bg={pathname === item.route ? hoverBg : 'transparent'}
                      _hover={{ 
                        bg: hoverBg,
                        color: activeColor 
                      }}
                      transition="all 0.2s"
                    >
                      {item.label}
                    </Text>
                  </Link>
                ))}
              </VStack>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  };

  return (
    <Drawer
      size="md"
      isOpen={props.isOpen} 
      placement="left" 
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerHeader 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          px={6}
          py={4}
        >
          <Heading 
            size="lg"
            color={activeColor}
            fontFamily="Cormorant Garamond"
          >
            Menú
          </Heading>
        </DrawerHeader>
        <DrawerCloseButton 
          size="lg"
          color="gray.500"
          _hover={{
            color: activeColor,
            bg: 'transparent'
          }}
        />
        <DrawerBody px={4} py={6}>
          <Accordion allowToggle>
            <VStack spacing={2} align="stretch">
              <SidebarItem
                icon={FaBox}
                label={SIDEBAR_ITEMS(isAdminUser).Stock.label}
                isExpanded={props.isOpen}
                subItems={SIDEBAR_ITEMS(isAdminUser).Stock.subItems}
              />
              {isAdminUser && (
                <>
                  <SidebarItem
                    icon={FaUsers}
                    label={SIDEBAR_ITEMS(isAdminUser).Resellers.label}
                    isExpanded={props.isOpen}
                    subItems={SIDEBAR_ITEMS(isAdminUser).Resellers.subItems}
                  />
                  <SidebarItem
                    icon={FaUsers}
                    label={SIDEBAR_ITEMS(isAdminUser).Sales.label}
                    isExpanded={props.isOpen}
                    subItems={SIDEBAR_ITEMS(isAdminUser).Sales.subItems}
                  />
                </>
              )}
            </VStack>
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuPanel;
