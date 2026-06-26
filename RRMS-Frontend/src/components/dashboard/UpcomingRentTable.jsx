function UpcomingRentTable({
  agreements,
  tenants,
  rooms
}) {

  return (
    <div className="card border-0 shadow-sm"
      style={{
      background:"#F8FAFC",
      borderRadius:"20px"
      }}
      >

      <div className="card-body">

        <h5 className="fw-bold mb-3">
          Upcoming Rent Collection
        </h5>

        <div className="table-responsive">

          <table className="table">

            <thead>
              <tr>
                <th>Tenant</th>
                <th>Room</th>
                <th>Rent</th>
              </tr>
            </thead>

            <tbody>

              {agreements
                .filter(a => a.isActive)
                .slice(0, 5)
                .map((agreement) => {

                  const tenant =
                    tenants.find(
                      t =>
                        t.id ===
                        agreement.primaryTenantId
                    );

                  const room =
                    rooms.find(
                      r =>
                        r.id ===
                        agreement.roomId
                    );

                  return (
                    <tr key={agreement.id}>
                      <td>{tenant?.name}</td>

                      <td>
                        {room?.roomNumber}
                      </td>

                      <td>
                        ₹
                        {agreement.rentPerMonth}
                      </td>
                    </tr>
                  );
                })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default UpcomingRentTable;