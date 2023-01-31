import { Form, useLoaderData, redirect } from 'react-router-dom'
import Table from '../components/Table'
import Row from '../components/Row'
import { ReactComponent as ClientIcon } from '../assets/heroIcons/briefcase.svg'
import { createClient, getClients, Client } from '../services/client'
import { Outlet } from 'react-router-dom'

export const loader = async () => {
  return await getClients()
}

export const action = async () => {
  const client = (await createClient()) as Client
  return redirect(`/clients/${client.id}/edit`)
}

const Clients = () => {
  const clients = useLoaderData() as Client[]

  return (
    <>
      <Table title="Clients">
        <>
          {clients.map(client => {
            return (
              <Row key={client.id} objectId={client.id}>
                <div className="flex flex-row items-center">
                  <ClientIcon className="w-14 h-14" />
                  <div className="ml-2">
                    <p className="text-xl tracking-wide text-gray-900">
                      {client.name}
                    </p>
                    {client.url ? (
                      <p className="text-sm text-gray-700">
                        website:&nbsp;
                        <a
                          href={`https://${client.url}`}
                          className="text-blue-300 underline"
                        >
                          {client.url}
                        </a>
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </Row>
            )
          })}
        </>
        <div className="text-center">
          <Form method="post">
            <button
              type="submit"
              className="rounded-full bg-blue-400 text-gray-100 text-lg px-6 py-1 my-3"
            >
              New +
            </button>
          </Form>
        </div>
      </Table>
      <Outlet />
    </>
  )
}

export default Clients