interface HeaderProps {
  leftComponent?: React.ReactNode;   
  centerComponent?: React.ReactNode; 
  rightComponent?: React.ReactNode;  
}

const Header = ({ leftComponent, centerComponent, rightComponent }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center p-6 bg-accent border-border">
      <div className="flex-1 text-left">{leftComponent}</div>
      <div className="flex-1 text-center">{centerComponent}</div>
      <div className="flex-1 text-right">{rightComponent}</div>
    </div>
  );
};

export default Header;
