import { useRef, useState, useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { AuthContext } from '../context/Auth'
import '../../stylesheet/mce.css'

const init = (useDarkMode) => {
    return {
        selector: 'textarea#open-source-plugins',
        plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak code | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
                callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            }
        },
        templates: [
            { title: 'New Table', description: 'creates a new table', content: '<div className="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div className="mceTmpl"><span className="cdate">cdate</span><br /><span className="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: '80vh',
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }
}
export const Admin2 = () => {
    const [page, setPage] = useState('')
    const [pageData, setPageData] = useState(null)
    const { authToken } = useContext(AuthContext)
    const editorRef = useRef(null);
    const create = async e => {
        if (editorRef.current) {
            const content = editorRef.current.getContent()
            console.log(content);
            const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/page/addpage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({
                    url: page,
                    content: content
                })
            })
            if (response.status !== 200) alert("Some error occured")
            else alert("Page saved")
            setPage('')
            setPageData(null)
        }
    };
    const update = async e => {
        if (editorRef.current) {
            const content = editorRef.current.getContent()
            console.log(content);
            const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/page/updatepage`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({
                    url: page,
                    content: content
                })
            })
            if (response.status !== 200) alert("Some error occured")
            else alert("Page saved")
            setPage('')
            setPageData(null)
        }
    };

    const newPage = e => {
        setPage('')
        setPageData(null)
    }

    const changePage = async e => {
        setPage(page.split(/\s+/).filter(e => e.length !== 0).join('-'))
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/page/${page}`)

            if (response.status !== 200) return setPageData("new")
            const data = await response.json()
            setPageData(data)
        } catch (error) {
            console.log(error)
            setPage('')
            setPageData(null)
        }
    }
    const deletePage = async e => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY || "http://localhost:8000"}/api/page/deletepage/${pageData.url}`, {
                headers: { "auth-token": authToken },
                method: 'DELETE'
            })

            if (response.status !== 200) return alert('Page Not Deleted')
            else alert("Page Deleted")
            setPage('')
            setPageData(null)
        } catch (error) {
            console.log(error)
            setPage('')
            setPageData(null)
        }
    }
    return (
        <div className="container" style={{ minHeight: '80vh' }} >
            {/* <label for="basic-url" className="form-label">Your vanity URL</label> */}
            <div className="input-group mb-3 px-4 py-2">
                <span className="input-group-text" id="basic-addon3">{window.location.origin + '/'}</span>
                <input type="text" value={page} onChange={e => setPage(e.target.value)} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                {page && page.length !== 0 && pageData && (pageData === "new" ?
                    <button className="btn btn-outline-secondary" type="button" onClick={page && create}>Create Page</button>
                    :
                    <button className="btn btn-outline-secondary" type="button" onClick={page && update}>Update</button>)
                }
                {
                    pageData && pageData !== 'new' &&
                    <button className="btn btn-outline-secondary" type="button" onClick={deletePage}>Delete</button>
                }
                <button className="btn btn-outline-secondary" type="button" onClick={!pageData ? changePage : newPage} id="button-addon2">{pageData ? "Cancle" : "Get details"}</button>
            </div>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={(pageData && pageData.content) || 'New Page'}
                init={init(window.matchMedia('(prefers-color-scheme: dark)').matches)}
            />
        </ div>
    )
}
