export interface TemaListProps {
  listArray?: any[];
  isTema?: boolean;
  selected: string | string[];
  handleSelect: (value: string) => void;
}
