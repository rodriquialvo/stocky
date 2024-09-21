import React from 'react';
import { Box, IconButton, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaBox, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Importar el archivo CSS module

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      className={`${styles.sidebar} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`} // Usar clases del CSS Module
    >
      <IconButton
        aria-label="Toggle expand sidebar"
        icon={<HamburgerIcon />}
        onClick={() => setIsExpanded(!isExpanded)}
        variant="outline"
        size="lg"
        className={styles.iconButton} // Usar clase del CSS Module
      />
      <VStack align="stretch">
        <SidebarContent isExpanded={isExpanded} />
      </VStack>
    </Box>
  );
};

const SidebarContent: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  return (
    <VStack align="stretch">
      <Accordion allowToggle>
        {/* Sección Stock */}
        <AccordionItem>
          <AccordionButton>
            <Flex align="center" w="100%">
              <Box as={FaBox} mr={isExpanded ? 2 : 0} />
              {isExpanded && <Box flex="1" textAlign="left">Stock</Box>}
            </Flex>
            {isExpanded && <AccordionIcon />}
          </AccordionButton>
          {isExpanded && (
            <AccordionPanel className={styles.accordionPanel}> {/* Usar clase del CSS Module */}
              <VStack align="start">
                <Link to="/stock/list">
                  <Text>Lista</Text>
                </Link>
                <Link to="/stock/add">
                  <Text>Ingreso</Text>
                </Link>
              </VStack>
            </AccordionPanel>
          )}
        </AccordionItem>

        {/* Sección Resellers */}
        <AccordionItem>
          <AccordionButton>
            <Flex align="center" w="100%">
              <Box as={FaUsers} mr={isExpanded ? 2 : 0} />
              {isExpanded && <Box flex="1" textAlign="left">Resellers</Box>}
            </Flex>
            {isExpanded && <AccordionIcon />}
          </AccordionButton>
          {isExpanded && (
            <AccordionPanel className={styles.accordionPanel}> {/* Usar clase del CSS Module */}
              <VStack align="start">
                <Link to="/resellers/list">
                  <Text>Lista</Text>
                </Link>
                <Link to="/resellers/new">
                  <Text>Nuevo</Text>
                </Link>
                <Link to="/resellers/metrics">
                  <Text>Métricas</Text>
                </Link>
              </VStack>
            </AccordionPanel>
          )}
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};
