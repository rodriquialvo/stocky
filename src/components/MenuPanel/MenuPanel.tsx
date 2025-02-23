import { DeleteIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
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

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CartPanel: FC<MenuPanelProps> = props => {
  const isAdminUser = useSessionStore(state => state.isAdminUser)
    const { pathname } = useLocation()

    useEffect(() => {
      props.onClose()
    },[pathname])
  const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isExpanded, subItems }) => {
    return (
      <AccordionItem border="none">
        {({ isExpanded: isItemExpanded }) => (
          <>
            <AccordionButton
              py={3}
            >
              <Flex align="center" w="100%">
                <Box as={icon} mr={isExpanded ? 2 : 0} fontSize="20px" />
                {isExpanded && <Box flex="1" textAlign="left">{label}</Box>}
              </Flex>
              {isExpanded && <AccordionIcon />}
            </AccordionButton>
            {isExpanded && isItemExpanded && (
              <AccordionPanel pb={4} pl={8}>
                <VStack align="start" spacing={2}>
                  {subItems.map((item, index) => (
                    <Link key={index} to={item.route}>
                      <Text fontSize="sm" _hover={{ color: "gray.300" }}>{item.label}</Text>
                    </Link>
                  ))}
                </VStack>
              </AccordionPanel>
            )}
          </>
        )}
      </AccordionItem>
    );
  };


  return (
    <>
      <>
        <Drawer
          size="md"
          isOpen={props.isOpen} placement="left" onClose={props.onClose}>
          px={2}
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Heading
              >
                Menú
              </Heading>
              <Accordion allowToggle>
                <SidebarItem
                  icon={FaBox}
                  label={SIDEBAR_ITEMS(isAdminUser).Stock.label}
                  isExpanded={props.isOpen}
                  subItems={SIDEBAR_ITEMS(isAdminUser).Stock.subItems}
                />
                {
                  isAdminUser &&
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
                }
              </Accordion>
              <Divider my={5} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
};

export default CartPanel;
