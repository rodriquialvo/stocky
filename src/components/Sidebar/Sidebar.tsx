import React from 'react';
import { Box, IconButton, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaBox, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { SidebarItemProps } from './interfaces';
import { SIDEBAR_ITEMS } from '../../constants/sidebar';

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
      w={isExpanded ? (isMobile ? "100%" : "250px") : "60px"}
      bg="gray.800"
      color="white"
      transition="all 0.3s"
      zIndex="1000"
      overflowX="hidden"
      overflowY="auto"
    >
      <Flex direction="column" h="100%">
        <IconButton
          aria-label="Toggle expand sidebar"
          icon={<HamburgerIcon />}
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="lg"
          m={2}
          alignSelf="flex-end"
        />
        <VStack align="stretch" flex={1} mt={4}>
          <SidebarContent isExpanded={isExpanded} />
        </VStack>
      </Flex>
    </Box>
  );
};

const SidebarContent: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  return (
    <VStack align="stretch" spacing={0}>
      <Accordion allowToggle>
        <SidebarItem
          icon={FaBox}
          label={SIDEBAR_ITEMS.Stock.label}
          isExpanded={isExpanded}
          subItems={SIDEBAR_ITEMS.Stock.subItems}
        />
        <SidebarItem
          icon={FaUsers}
          label={SIDEBAR_ITEMS.Resellers.label}
          isExpanded={isExpanded}
          subItems={SIDEBAR_ITEMS.Resellers.subItems}
        />
      </Accordion>
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
            _hover={{ bg: "gray.700" }}
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