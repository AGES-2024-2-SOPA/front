
interface ContainerProps {
    maxHeight: number;
}

const Container = ({ maxHeight }: ContainerProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[-1] px-9 py-8 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full" style={{ maxHeight: `${maxHeight}px`, height: `${maxHeight}px`}}>
            </div>
        </div>
    );
}

export default Container;
