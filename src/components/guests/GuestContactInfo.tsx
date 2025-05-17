
import React from "react";
import { GuestProfile } from "@/types/guest-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GuestContactInfoProps {
  guest: GuestProfile;
}

const GuestContactInfo = ({ guest }: GuestContactInfoProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Email:</dt>
                <dd className="text-sm">{guest.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Phone:</dt>
                <dd className="text-sm">{guest.phone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {guest.address && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold mb-3">Address</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Street:</dt>
                  <dd className="text-sm">{guest.address.street}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">City:</dt>
                  <dd className="text-sm">{guest.address.city}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">State/Province:</dt>
                  <dd className="text-sm">{guest.address.state}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Postal Code:</dt>
                  <dd className="text-sm">{guest.address.zipCode}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">Country:</dt>
                  <dd className="text-sm">{guest.address.country}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold mb-3">Identification</h3>
          <dl className="space-y-2">
            {guest.idNumber ? (
              <>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">ID Type:</dt>
                  <dd className="text-sm">
                    <Badge variant="outline" className="capitalize">
                      {guest.idType?.replace('-', ' ')}
                    </Badge>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-muted-foreground">ID Number:</dt>
                  <dd className="text-sm">{guest.idNumber}</dd>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">No identification on file</p>
            )}
          </dl>
        </CardContent>
      </Card>

      {guest.loyaltyProgram && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold mb-3">Loyalty Program</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Member Number:</dt>
                <dd className="text-sm">{guest.loyaltyProgram.memberNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Level:</dt>
                <dd className="text-sm">
                  <Badge variant="secondary">{guest.loyaltyProgram.level}</Badge>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-muted-foreground">Points Balance:</dt>
                <dd className="text-sm font-medium">{guest.loyaltyProgram.points} points</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GuestContactInfo;
