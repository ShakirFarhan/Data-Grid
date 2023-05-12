import TypesModal from './TypesModal';
import './common.css';
const CustomHeaderCell: React.FC<{
  label: string;
  children?: any;
  type: string;
}> = ({ label, children, type }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        rowGap: '14px',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <span style={{ fontWeight: '400', fontSize: '15px' }}>{label}</span>
      <TypesModal />
      {children}
    </div>
  );
};
export default CustomHeaderCell;
