import React from 'react'
import {
  Table, TableCaption, TableHeader, TableRow,
  TableHead, TableBody, TableCell
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector(store => store.job); // fallback to []

  return (
    <div className='max-w-4xl mx-auto'>
      <Table>
        <TableCaption>A List of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                You have not applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={`${appliedJob?.status.toLowerCase() === "rejected" ? 'bg-red-400' : appliedJob?.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
