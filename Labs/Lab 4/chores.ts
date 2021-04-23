<grammar root="niceRobot">
   <rule id="niceRobot">
      <one-of>
         <item>please</item>
            <ruleref uri="#chores"/>
            <tag>out.chores=Object(); out.chores.object=rules.chores.object; out.chores.move=rules.chores.type;</tag>
        
         <ruleref uri="#chores"/>
         <tag>out.chores=Object(); out.chores.object=rules.chores.object; out.chores.move=rules.chores.type;</tag>
      </one-of>
   </rule>

   <rule id="object1">
      <one-of>
         <item>light</item>
         <item>A C<tag>out='air conditioning';</tag></item>
         <item>air conditioning</item>
         <item>heat</item>
      </one-of>
   </rule>

   <rule id="object2">
      <one-of>
         <item>window</item>
         <item>door</item>
      </one-of>
   </rule>

   <rule id="action1">
      <one-of>
         <item>off</item>
         <item>on</item>
   </rule>

   <rule id="action2">
      <one-of>
         <item>open</item>
         <item>close</item>
   </rule>

   <rule id="chores"
      <one-of>
         <item>turn
            <ruleref uri="#action1"/>
            the
            <ruleref uri="#object1"/>
            <tag>out.object=rules.object1; out.type=rules.action1;</tag></item>
         <item><ruleref uri="#action2"/>
            the
         <ruleref uri="#object2"/>
         <tag>out.object=rules.object2; out.type=rules.action2;</tag></item>
         <item>turn the
            <ruleref uri="#object1"/>
            <ruleref uri="#action1"/>
            <tag>out.object=rules.object1; out.type=rules.action1;</tag></item>
      </one-of>      
   </rule>
</grammar>