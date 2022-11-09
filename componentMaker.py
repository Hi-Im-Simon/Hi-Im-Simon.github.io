import os, sys

if len(sys.argv) != 2:
    print('Invalid argument')
else:
    name = sys.argv[1].capitalize()
    dir_path = f'src/components/{ name }'
    jsx_path = dir_path + f'/{ name }.jsx'
    css_path = dir_path + f'/{ name }.css'
    os.makedirs(dir_path, exist_ok=False)
    
    jsx_file = open(jsx_path, 'w+')
    jsx_file.write(
f"""import './{ name }.css';

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