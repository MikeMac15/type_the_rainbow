import 'app/styles/home.css'
export default function MenuBtn({title, press}:{title:string,press: () => void}){
    return (
            <button className='menuButton' onClick={press}>
                {title}
            </button>
    )
}