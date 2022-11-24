import os, sys

if len(sys.argv) != 2:
    print('Invalid argument')
else:
    name = sys.argv[1].capitalize()
    jsx_path = f'src/components/{ name }.tsx'
    css_path = f'src/styles/{ name }.css'
    
    jsx_file = open(jsx_path, 'w+')
    jsx_file.write(
f"""import '../styles/{ name }.css';

const { name } = (props) => {{
	return (
		<div className='{ name }'>
			
		</div>
	);
}};

export default { name };"""
    )
    jsx_file.close()
    
    css_file = open(css_path, 'w+')
    css_file.write(
f""".{ name } {{
    
}}"""
    )
    css_file.close()
