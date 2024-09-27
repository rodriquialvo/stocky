export interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    isExpanded: boolean;
    subItems: Array<{ label: string; route: string }>;
  }