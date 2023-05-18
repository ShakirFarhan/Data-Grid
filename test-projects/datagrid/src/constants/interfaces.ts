export interface columnInterface {
  id: string;
  headerName: string;
  field: string;
  type: string;
  headerComponent: () => JSX.Element;
  headerClass: string;
  cellRendererFramework?: any;
  cellRendererParams?: any;
  pinned?: 'left' | 'right';
  width?: number;
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
  id: string;
  onColumnChange: (
    colId: string,
    newHeaderName: string,
    newFieldName: string,
    id: string
  ) => void;
  handlePin: (id: string, pinned: boolean) => void;
  userColumn?: boolean;
}
export interface defaultProps {
  id: string;
  type: string;
  column: string;
  onColumnChange: (
    colId: string,
    newHeaderName: string,
    newFieldName: string,
    id: string
  ) => void;
}