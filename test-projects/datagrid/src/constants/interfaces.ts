export interface columnInterface {
  headerName: string;
  field: string;
  type: string;
  headerComponent: () => JSX.Element;
  headerClass: string;
  cellRendererFramework?: any;
  cellRendererParams?: any;
}
export interface rowType {
  id?: number | string;
  name?: string | number;
  age?: number | string;
  phone?: number | string;
}
export interface IProps {
  onEdit: (params: any) => void;
  cellValue: string;
}
export interface columnHeaderProps {
  label: string;
  children?: any;
  type: string;
  onEdit?: () => any;
}
