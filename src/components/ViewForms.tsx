import { useEffect, useState } from 'react';
import { FORMArray } from '../types/formType';
import { Link } from 'react-router-dom';
import getAllForms from '../api/getAllForms';

function ViewForms({ itemsPerPage }: { itemsPerPage: number }) {
    const [formList, setFormList] = useState<FORMArray>([]);
    const [skip, setSkip] = useState<number>(0);

    useEffect(() => {
        async function init() {
            const res = await getAllForms(`type=form&select=title,name,path&limit=${itemsPerPage}&skip=${skip}`);
            setFormList(res);
        }
        init();
    }, [itemsPerPage, skip]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Form Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formList.map((item, i) =>
                        <tr key={`${item.title}-${i}`}>
                            <td>{item.title}</td>
                            <td>
                                <Link to={`/builder/${item.name}`}>Builder</Link>
                                &nbsp;&nbsp;
                                <Link to={`/renderer/${item.path}`}>Renderer</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                <button onClick={() => setSkip(prev => prev >= itemsPerPage ? prev - itemsPerPage : 0)}>Previous</button>
                <button onClick={() => setSkip(prev => prev + itemsPerPage)}>Next</button>
            </div>
        </div>
    );
}

export default ViewForms;