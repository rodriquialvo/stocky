import { HamburgerIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaBox, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SIDEBAR_ITEMS } from '../../constants/sidebar';
import { SidebarItemProps } from './interfaces';
import { useSessionStore } from '../../store/session/slice';
import { FiLogOut } from 'react-icons/fi';
import { SessionAction } from '../../store/session/actions';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      w={isExpanded ? (isMobile ? "100%" : "250px") : (isMobile ? 0 : "70px")}
      bg="gray.800"
      color="white"
      transition="all 0.3s"
      zIndex="1000"
      overflowX="hidden"
      overflowY="auto"
    >
      <Flex direction="column" h="100%">
        {
          !isMobile &&
          <IconButton
            aria-label="Toggle expand sidebar"
            icon={<HamburgerIcon />}
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="lg"
            m={2}
            alignSelf="flex-end"
            color={"white"}
          />
        }
        <VStack align="stretch" flex={1} mt={4}>
          <SidebarContent isExpanded={isExpanded} />
        </VStack>
      </Flex>
      
    </Box>
  );
};

const SidebarContent: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  const isAdminUser = useSessionStore(state => state.isAdminUser)
  const { isOpen: isOpenModalLogout, onOpen: onOpenModalLogout, onClose: onCloseLogout } = useDisclosure();
  const { logout } = SessionAction()
  const userLoged = useSessionStore(state => state.userLogged)

  return (
    <VStack align="stretch" spacing={0}>
      <Accordion allowToggle>
        <SidebarItem
          icon={FaBox}
          label={SIDEBAR_ITEMS(isAdminUser).Stock.label}
          isExpanded={isExpanded}
          subItems={SIDEBAR_ITEMS(isAdminUser).Stock.subItems}
        />
        {
          isAdminUser &&
          <>
            <SidebarItem
              icon={FaUsers}
              label={SIDEBAR_ITEMS(isAdminUser).Resellers.label}
              isExpanded={isExpanded}
              subItems={SIDEBAR_ITEMS(isAdminUser).Resellers.subItems}
            />
            <SidebarItem
              icon={FaUsers}
              label={SIDEBAR_ITEMS(isAdminUser).Sales.label}
              isExpanded={isExpanded}
              subItems={SIDEBAR_ITEMS(isAdminUser).Sales.subItems}
            />
          </>
        }
      </Accordion>
      {isExpanded && <Button onClick={onOpenModalLogout} mx={4} mt={8} colorScheme={"pink"}>Cerrar Sesion</Button>}
      <Modal isOpen={isOpenModalLogout} onClose={onCloseLogout}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmación de Rechazo</ModalHeader>
          <ModalBody>
            <Text>¿Está seguro que desea cerrar Sesion ?</Text>
          </ModalBody>
          <ModalFooter>
            <Button size={{ base: "xs", md: "sm" }} variant="ghost" onClick={onCloseLogout}>Cancelar</Button>
            <Button size={{ base: "xs", md: "sm" }} colorScheme="red" ml={3} onClick={logout}>
              Confirmar Cierre de Sesión
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isExpanded, subItems }) => {
  return (
    <AccordionItem border="none">
      {({ isExpanded: isItemExpanded }) => (
        <>
          <AccordionButton
            py={3}
            _hover={{ bg: "pink.500" }}
            _expanded={{ bg: "gray.700" }}
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