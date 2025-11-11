export default function UpdateDeliverydetails(){
    return(
           <div className="py-4 mt-2">
        <h2 className="font-bold mb-4 text-xl">Update Delivery Address</h2>
        <p className="mb-3">
          Keep your delivery information up to date so your orders reach you on
          time.
          <br />
          Please review and edit your address details below.
          <br />
        </p>
        <ul>
          <li>
            <strong>Full Name -</strong> Enter the name for delivery
          </li>

          <li>
            <strong>Phone Number -</strong> Your active contact number
          </li>

          <li>
            <strong>Street Address -</strong> House number, building name,
            street
          </li>

          <li>
            <strong>City -</strong> Enter your city
          </li>

          <li>
            <strong>State / Province -</strong> Enter your state or province
          </li>

          <li>
            <strong>Postal Code -</strong> Enter a valid ZIP or PIN code
          </li>

          <li>
            <strong>Landmark (optional) -</strong> Nearby landmark for easy
            delivery reference
          </li>
        </ul>
      </div>
    )
}