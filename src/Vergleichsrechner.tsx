import React from "react";

const Vergleichsrechner = () => {
  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vergleichsrechner: Privathaftpflicht</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://expert-marketplace.beratung.show/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YW5jZV9pZCI6InNwYXJrYXNzZS13dXBwZXJ0YWwuYmVyYXR1bmcuc2hvdyIsInByb2R1Y3RfaWQiOjcsInNvZnRmYWlyX3VzZXJfa3VuZGVfaWQiOjM5MTk3OTcsImNvcnJlbGF0aW9uX2lkIjoiMjdmYWU0ZTMtNzBhYy00MzI4LWFjNTEtM2JkNmFkN2FhNDAzIiwiZXhwIjoxNzQzMDkwMTgyLCJzcGFydGUiOiJwaHYifQ.gAU4XM17mAoAyRfl_WGRJQavM2I9jLtGO_O5dPjFaVY"
          className="w-full h-[800px] border border-gray-300 rounded-xl shadow"
          title="Vergleichsrechner Privathaftpflicht"
        />
      </div>
    </div>
  );
};

export default Vergleichsrechner;