interface H2Props {
  children: React.ReactNode;
  className?: string;
}
export default function h2({ children, className = "" }: H2Props){
    return(
         <h2 className={`text-xl font-bold text-gray-600 text-left ${className}` }>
            {children}
        </h2>
    )
}