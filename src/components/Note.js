import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';



class Note extends Component {
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
      }

    render() { 
        return (
            <div className="note">
                <h2> Meine Notiz </h2>
                <div>
                    <Editor
                        apiKey="u9xtwod0rigp9bikqs703hg38cc6jl62c0zkaxoofb99l70q"
                        initialValue="<p>This is the initial content of the editor</p>"
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={this.handleEditorChange}
                    />
                </div>
            </div>
          );
    }
}
 
export default Note;