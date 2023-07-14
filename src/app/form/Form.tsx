import React from 'react'
import { users, PrismaClient } from '@prisma/client'
import '../styles.css'

interface FormProps {
    users: users[]
}

const prisma = new PrismaClient()

export default function Form ({users}:FormProps) {
    const handleSubmit = async () => {
        try {
            const transaction = await prisma.transactions.create({
            // Test Daten, weil wir wissen wollten, ob es in der DB gespeichert wird.
            // Funktioniert aber nicht.
            data: {
                title: 'test',
                comment: 'comment',
                groupId: 1,
                total: 10,
                payedBy: 2,
                createdAt: new Date().getTime().toString()
            }
        })
            console.log('Created transaction:', transaction)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form>
            <ul>
                <h2>Italien Urlaub</h2>
                
                <li>
                    <span className='leftF'><label htmlFor="title">Title</label></span>
                    <span className='rightF'>
                        <input type="text" name="title" id="title" className='inputF' />
                    </span>
                </li>
                <hr />
                <li>
                    <span className='leftF'><label htmlFor="whoPaid">Who Paid?</label></span>
                    <span className='rightF'>
                        <select name="payer" className='inputF'>
                            <option value="" hidden={true}>
                                Select User
                            </option>
                            {users?.map((user) => (
                            <option key={user.userId} value={user.userId}>
                                {user.username}
                            </option>
                            ))}
                        </select>
                    </span>
                </li>
                <hr />
                <li>
                    <span className='leftF'><label htmlFor="total">Total</label></span>
                    <span className='rightF'>
                        <input
                            type="number"
                            step=".01"
                            name="total"
                            className='numberF'
                        /> €   
                    </span>
                </li>
                <hr />
                <li>
                    <span className='leftF'>
                        <input type="checkbox" name="check_1"
                            id="check_1" 
                            defaultChecked={true}
                            />
                        <label htmlFor="check_1">Lara: </label>
                        <input type="number" step=".01"
                            name="portion_1" id="portion_1"
                            className='numberF'
                        /> €
                    </span>
                    <span className='rightF'> or <input
                            type="checkbox" name="equal_check_1"
                            id="equal_check_1"
                            />
                        <label htmlFor="equal_check_1"> split the
                            rest</label>
                    </span>
                </li>
                <hr />
                <li>
                    <span className='leftF'>
                        <input type="checkbox" name="check_2"
                            id="check_2" 
                            defaultChecked={true}
                            />
                        <label htmlFor="check_2">Mati: </label>
                        <input type="number" step=".01"
                            name="portion_2" id="portion_2"
                            className='numberF'
                        /> €
                    </span>
                    <span className='rightF'> or <input
                            type="checkbox" name="equal_check_2"
                            id="equal_check_2"
                            />
                        <label htmlFor="equal_check_2"> split the
                            rest</label>
                    </span>
                </li>
                <hr />
                <li>
                    <span className='leftF'><label htmlFor="comment">Comment: </label></span>
                    <span className='rightF'><textarea name="comment"></textarea></span>
                </li>
            </ul>
            <input type="hidden" name="groupId"/>
            <p>
                <input
                    type="submit"
                    value="Add"
                    name="create"
                    className='button'
                    // onClick={handleSubmit()}
                />
            </p>
        </form>
    )
}
