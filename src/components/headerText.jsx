/* eslint-disable react/prop-types */
const HeaderText = ({ className, children }) => {
	//animation-header
	return (
		<p className={`text-center font-bold text-3xl md:text-4xl text-color-headerPrimary capitalize ${className} `}>
			{children}
		</p>
	);
};

export default HeaderText;