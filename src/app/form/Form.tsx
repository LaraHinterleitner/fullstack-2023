import React from 'react'
import styles from '../page.module.css'
import { users, PrismaClient } from '@prisma/client'

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
                createdAt: '12'
            }
        })
            console.log('Created transaction:', transaction)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form>
            <ul className={`${styles.tworowlist} ${styles.flexlistparent}`}>
            <li>
                <label htmlFor="title">Title </label>
                <span className={styles.flexright}>
                <input type="text" name="title" id="title" />
                </span>
            </li>
            <li>
                Who paid?
                <span className={styles.flexright}>
                <select name="payer">
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
            <li>
                <label htmlFor="total">Total </label>
                <span className={styles.flexright}>
                <input
                    type="number"
                    step=".01"
                    name="total"
                    className={styles.numberfield}
                />
                €
                </span>
            </li>
            <li>
                <span>
                    <input type="checkbox" name="check_1"
                        id="check_1" 
                        checked={true}
                        // onclick="toggleUser(1)"
                        />
                    <label htmlFor="check_1">Lara: </label>
                </span>
                <span></span>
                <span>
                    <input type="number" step=".01"
                        name="portion_1" id="portion_1"
                        // value="0" 
                        className="number-field"/>€
                </span>
                <span className="flex-right"> or <input
                        type="checkbox" name="equal_check_1"
                        id="equal_check_1"
                        // onclick="toggleField(1)"
                        />
                    <label htmlFor="equal_check_1"> split the
                        rest</label>
                </span>
            </li>
            <li>
                <span>
                    <input type="checkbox" name="check_2"
                        id="check_2" 
                        checked={true}
                        // onclick="toggleUser(1)"
                        />
                    <label htmlFor="check_2">Mati: </label>
                </span>
                <span></span>
                <span>
                    <input type="number" step=".01"
                        name="portion_2" id="portion_2"
                        // value="0" 
                        className="number-field"/>€
                </span>
                <span className="flex-right"> or <input
                        type="checkbox" name="equal_check_2"
                        id="equal_check_2"
                        // onclick="toggleField(1)"
                        />
                    <label htmlFor="equal_check_2"> split the
                        rest</label>
                </span>
            </li>

            <li>
                <label htmlFor="comment">Comment: </label>
                <textarea name="comment"></textarea>
            </li>
            </ul>
            <input type="hidden" name="groupId" 
            // value="9" 
            />
            <p className={styles.centerui}>
            <input
                type="submit"
                value="Add"
                name="create"
                className={styles.button}
                onClick={handleSubmit()}
            />
            </p>
        </form>
    )
}
