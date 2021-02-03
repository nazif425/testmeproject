export default [
   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
   [{ 'font': [] }],
   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// custom button values
   [{ 'header': 1 }, { 'header': 2 }],  
   ['blockquote', 'code-block'],
   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
   [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript      
   [{ 'direction': 'rtl' }],                    // text direction
   [{ 'indent': '-1'}, { 'indent': '+1' }],     // outdent/indent               
   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
   [{ 'align': [] }],
   ['clean']                                         // remove formatting button
]