function RecentAgreements({
  agreements,
  tenants
}) {

  const latest =
    [...agreements]
      .sort(
        (a, b) =>
          new Date(b.startDate) -
          new Date(a.startDate)
      )
      .slice(0, 5);

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-body">

        <h5 className="fw-bold mb-3">
          Recent Agreements
        </h5>

        <ul className="list-group">

          {latest.map((agreement) => {

            const tenant =
              tenants.find(
                t =>
                  t.id ===
                  agreement.primaryTenantId
              );

            return (
              <li
                key={agreement.id}
                className="list-group-item"
              >
                {tenant?.name}

                <span className="float-end">
                  ₹
                  {agreement.rentPerMonth}
                </span>
              </li>
            );
          })}

        </ul>

      </div>

    </div>
  );
}

export default RecentAgreements;